interface OptionItem {
    key: string | any;
    value: string | any;
}
interface JsonListItem {
    key: string;
    alias?: string;
    width?: string;
    default?: string | boolean | [] | number | any;
    desc?: string;
    primary?: string | boolean;
    label?: string;
    placeholder?: string;
    type?: string;
    options?: null | { [key: string]: [value: any] } | any;
    expand?: boolean;
    required?: boolean;
    description?: string;
    requiredMessage?: string;
    format?: string,
    showTime?: boolean,
    optionValueType?: boolean,
    optionList?: OptionItem[],
}

export type { JsonListItem };