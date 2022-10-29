export default function Footer() {

    const footerContainerStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        zIndex: '100',
        color: '#fff',
    };

    return (
        <div style={footerContainerStyle}>
            <p>Created by Brandon Mikowski</p>
        </div>
    )
}