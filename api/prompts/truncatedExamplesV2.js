/**
 * Truncated versions of full examples - first paragraph only
 * Gives flavor without massive token cost
 */

import { positionExamples } from './examplesV2.js';

export function getTruncatedExample(position, type = 'general') {
    const upperPosition = position.toUpperCase();
    const positionData = positionExamples[upperPosition];
    
    if (!positionData || !positionData.examples) {
        return null;
    }
    
    const fullExample = positionData.examples[type] || positionData.examples.general;
    if (!fullExample) return null;
    
    // Extract just the first paragraph (up to first double newline)
    const firstParagraph = fullExample.split('\n\n')[0];
    return firstParagraph + '...';
}

export function getMultipleTruncatedExamples(positions) {
    let examples = 'POSITION INTERPRETATION EXAMPLES:\n\n';
    
    // Show max 2-3 truncated examples
    const maxExamples = Math.min(positions.length, 2);
    
    for (let i = 0; i < maxExamples; i++) {
        const truncated = getTruncatedExample(positions[i]);
        if (truncated) {
            examples += `${positions[i].toUpperCase()}:\n${truncated}\n\n`;
        }
    }
    
    return examples;
}