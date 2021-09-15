
export interface Question {
    question: string
    answer: number
}

export type Action = '+' | '-' | '*' | '/';

function random(min: number = 0, max: number = 10): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomAction(actions: Action[]): Action {
    return actions[Math.floor(Math.random() * actions.length)];
}

function normilizeQuestion(question: string): string {
    question = question.replace('*', '×');
    question = question.replace('/', '÷');
    return question;
}

export function generate(actions: Action[] = ['+', '-', '*', '/'], min: number = 0, max: number = 10, count: number = 10): Question[] {
    let questions: Question[] = [];

    for (let i = 0; i < count; i++) {
        let action: Action = randomAction(actions);
        let first: number = random(min, max), second: number = random(min, max);

        if (action === '/' && (first === 0 || second === 0)) {
            i--;
            continue;
        }

        let question: string = `${first} ${action} ${second}`;
        let answer: number = eval(question);

        questions.push({
            question: normilizeQuestion(question),
            answer: answer
        });
    }

    return questions;
}
