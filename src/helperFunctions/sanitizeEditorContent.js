import DOMPurify from "dompurify";

export const sanitizeHtml = (html)=>{
    const sanitizedHtml = DOMPurify.sanitize(html)
    return {__html: sanitizedHtml}
}

const ContentDisplay = ({htmlContent})=>{
    const sanitizeContent = sanitizeHtml(htmlContent)
    return <div dangerouslySetInnerHTML={sanitizeContent} />
}

export default ContentDisplay