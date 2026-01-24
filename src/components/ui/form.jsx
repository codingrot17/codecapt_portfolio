"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

// ---------- FormField Context ----------
const FormFieldContext = React.createContext({});

const FormField = props => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

// ---------- FormItem Context ----------
const FormItemContext = React.createContext({});

// ---------- useFormField hook ----------
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const fieldState = getFieldState(fieldContext.name, formState);
    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    };
};

// ---------- FormItem ----------
const FormItem = React.forwardRef(function FormItem(
    { className, ...props },
    ref
) {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    );
});

// ---------- FormLabel ----------
const FormLabel = React.forwardRef(function FormLabel(
    { className, ...props },
    ref
) {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            htmlFor={formItemId}
            className={cn(error && "text-destructive", className)}
            {...props}
        />
    );
});

// ---------- FormControl ----------
const FormControl = React.forwardRef(function FormControl(props, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                error
                    ? `${formDescriptionId} ${formMessageId}`
                    : formDescriptionId
            }
            aria-invalid={!!error}
            {...props}
        />
    );
});

// ---------- FormDescription ----------
const FormDescription = React.forwardRef(function FormDescription(
    { className, ...props },
    ref
) {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});

// ---------- FormMessage ----------
const FormMessage = React.forwardRef(function FormMessage(
    { className, children, ...props },
    ref
) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;

    if (!body) return null;

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("text-sm font-medium text-destructive", className)}
            {...props}
        >
            {body}
        </p>
    );
});

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField
};
