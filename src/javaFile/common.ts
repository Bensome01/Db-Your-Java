import { genericAnnotation } from "../Parse/tokens";

export const findAnnotations = (tokens: string[]): { annotations: string[], annotationEnd: number } => {
    const annotationEnd: number = tokens
        .findIndex(token => !genericAnnotation
            .some(annotation => annotation.test(token)));

    const annotations: string[] = tokens.slice(0, annotationEnd);

    return {
        annotations: annotations,
        annotationEnd: annotationEnd
    };
}