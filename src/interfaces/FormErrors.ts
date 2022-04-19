interface GenericError {
    title: string
    message: string
}

interface FormFieldError {
    hasError: boolean
    inlineErrorMessage: string
    dirty?: boolean //might use
}

interface FormFields {
    [field: string]: FormFieldError
}

export interface FormErrors {
    generic: GenericError
    fields: FormFields 
    // meerdere velden met fields
}