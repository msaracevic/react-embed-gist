import * as React from "react";

export interface Props {
    gist: `${string}/${string}`;
    wrapperClass?: string;
    loadingClass?: string;
    titleClass?: string;
    contentClass?: string;
    errorClass?: string;
    file?: string;
    LoadingFallback?: React.ReactNode;
}

export default function ReactEmbedGist({}: Props): React.ReactNode;