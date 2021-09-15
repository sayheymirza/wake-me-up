import React from "react";
import { useState } from "react";

interface ItemProps {
    question: string
    answer: number
}

export function Item(props: ItemProps) {
    const [value, setValue] = useState<number>();

    const state = () => {
        if (value === undefined) return '';
        else if (value !== props.answer) return ' wrong';
        else return ' right';
    }

    return (
        <div className={`item${state()}`}>
            <span>{props.question} = </span>&nbsp;<input type="number" value={value} onChange={(input) => setValue(parseInt(input.target.value))} />
        </div>
    );
}