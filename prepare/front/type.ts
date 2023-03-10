export interface IProjects {
    id: number,
    title:string,
    name: string,
    description: string,
    image_path: string,
    path: string,
}

export interface Quote {
    name: string,
    content: string
}

export interface quoteProps  {
    quoteResult: null | Quote,
    showQuoteLoading: boolean,
    showQuoteComplete: boolean,
    showQuoteError: any,
}

export interface quoteResponse {
     data: string;
}