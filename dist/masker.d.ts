export default function (value: string, mask: string, masked?: boolean, tokens?: {
    '#': {
        pattern: RegExp;
    };
    'X': {
        pattern: RegExp;
    };
    'S': {
        pattern: RegExp;
    };
    'A': {
        pattern: RegExp;
        transform: (v: string) => string;
    };
    'a': {
        pattern: RegExp;
        transform: (v: string) => string;
    };
    '!': {
        escape: boolean;
    };
}): string | ((value: any, mask: any, masked?: boolean) => any);
