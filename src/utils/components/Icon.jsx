export default function Icon({ icon, className }) {
    return (
        <span className={`material-symbols-rounded ${className ? className : ''}`}>{icon}</span>
    );
}