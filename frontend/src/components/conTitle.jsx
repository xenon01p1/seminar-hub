export default function ConTitle({ title, icon='', extraStyles = '' }) {
    return (
        <p className={`
        text-lg font-medium text-gray-700 
        flex items-center 
        ${extraStyles}
        `}>
            <i className={`
                ${icon} 
                text-3xl 
                ${ (icon.length === 0) ? '' : 'mr-4' } 
            `}></i>
            { title }
        </p>
    );
}