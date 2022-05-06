import type { FormField } from "@/interfaces/form";
import type { PropsWithClasses } from "@/interfaces/global";
import type { InputHTMLAttributes } from 'react';

import { memo } from "react";

type Props<T = {}> =
    & PropsWithClasses<'label' | 'input'>
    & InputHTMLAttributes<T>
    & FormField;

const Textfield = ({
    id,
    classes,
    labelSlot,
    ...restInputProps
}: Props) => (
    <>
        {Boolean(labelSlot) && (
            <label
                className={classes.label}
                htmlFor={id}
            >
                {labelSlot}
            </label>
        )}
        <input
            {...restInputProps}
            className={classes.input}
            id={id}
        />
    </>
);

export default memo(Textfield);
