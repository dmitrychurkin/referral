import type { PropsWithTFunc } from '@/interfaces/global';
import type { Props as ButtonProps } from '@/ui/atoms/Button';

import { memo } from "react";

import Button, { Variants } from "@/ui/atoms/Button";

export type Props =
    & ButtonProps
    & PropsWithTFunc
    & {
        readonly isSubmitting: boolean;
        readonly isValid: boolean;
    };

const SubmitAction = ({ t, isSubmitting, isValid, startIcon, ...restProps }: Props) => (
    <Button
        startIcon={startIcon}
        type='submit'
        disabled={isSubmitting || !isValid}
        {...restProps}
    >
        {t('form.action')}
    </Button>
);

SubmitAction.defaultProps = {
    variant: Variants.CONTAINED
};

export default memo(SubmitAction);
