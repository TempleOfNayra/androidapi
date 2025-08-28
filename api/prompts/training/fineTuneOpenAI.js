/**
 * Fine-tune OpenAI model with Nayra training data
 * 
 * Prerequisites:
 * 1. npm install openai
 * 2. Set OPENAI_API_KEY environment variable
 * 3. Generate training data using prepareTrainingData.js
 */

import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function uploadTrainingFile() {
    console.log('Uploading training data...');
    
    const trainingFile = await openai.files.create({
        file: fs.createReadStream('/Users/aliemami/prod/nayra/android-api/api/prompts/training/nayra_training_data.jsonl'),
        purpose: 'fine-tune',
    });
    
    console.log('Training file uploaded:', trainingFile.id);
    
    // Upload validation file
    const validationFile = await openai.files.create({
        file: fs.createReadStream('/Users/aliemami/prod/nayra/android-api/api/prompts/training/nayra_validation_data.jsonl'),
        purpose: 'fine-tune',
    });
    
    console.log('Validation file uploaded:', validationFile.id);
    
    return { trainingFileId: trainingFile.id, validationFileId: validationFile.id };
}

async function startFineTuning(trainingFileId, validationFileId) {
    console.log('Starting fine-tuning job...');
    
    const fineTune = await openai.fineTuning.jobs.create({
        training_file: trainingFileId,
        validation_file: validationFileId,
        model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
        hyperparameters: {
            n_epochs: 3, // Number of training passes
            batch_size: 3,
            learning_rate_multiplier: 0.3,
        },
        suffix: 'nayra-tarot-v1', // Your model will be named like: ft:gpt-3.5-turbo:org:nayra-tarot-v1:xxx
    });
    
    console.log('Fine-tuning job created:', fineTune.id);
    return fineTune.id;
}

async function checkFineTuningStatus(jobId) {
    const job = await openai.fineTuning.jobs.retrieve(jobId);
    console.log('Status:', job.status);
    console.log('Model:', job.fine_tuned_model);
    
    if (job.status === 'succeeded') {
        console.log('✅ Fine-tuning complete!');
        console.log('Your model ID:', job.fine_tuned_model);
        saveModelId(job.fine_tuned_model);
    } else if (job.status === 'failed') {
        console.log('❌ Fine-tuning failed:', job.error);
    } else {
        console.log('⏳ Still training... Check back in a few minutes');
    }
    
    return job;
}

function saveModelId(modelId) {
    const config = {
        modelId: modelId,
        createdAt: new Date().toISOString(),
        baseModel: 'gpt-3.5-turbo',
        purpose: 'nayra-tarot-readings'
    };
    
    fs.writeFileSync(
        '/Users/aliemami/prod/nayra/android-api/api/prompts/training/model_config.json',
        JSON.stringify(config, null, 2)
    );
    
    console.log('Model configuration saved to model_config.json');
}

// Main execution flow
async function fineTuneNayra() {
    try {
        // Step 1: Upload files
        const { trainingFileId, validationFileId } = await uploadTrainingFile();
        
        // Step 2: Start fine-tuning
        const jobId = await startFineTuning(trainingFileId, validationFileId);
        
        // Step 3: Monitor progress (you'll need to run this periodically)
        console.log('\nRun this command to check status:');
        console.log(`node fineTuneOpenAI.js --check ${jobId}`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args[0] === '--check' && args[1]) {
    // Check status of existing job
    checkFineTuningStatus(args[1]);
} else {
    // Start new fine-tuning
    fineTuneNayra();
}

export { uploadTrainingFile, startFineTuning, checkFineTuningStatus };