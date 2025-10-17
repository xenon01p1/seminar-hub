export default function ConTitle({ title, extraStyles = '' }) {
    return (
        <p className={`text-lg font-medium text-gray-700 ${ extraStyles }`}>
            { title }
        </p>
    );
}