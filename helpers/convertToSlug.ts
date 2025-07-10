import unidecode from "unidecode"

export const convertToSlug=(text:string):string=>{
    const unidecodeText=unidecode(text.trim());

    const slug:string=unidecodeText.replace(/\s+/g, "-");
    console.log(unidecodeText);
    console.log(slug);

    return slug;
}