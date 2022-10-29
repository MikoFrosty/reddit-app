export default function Header() {
    
    const headerContainerStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        color: '#fff',
        backgroundColor: '#202020',
        zIndex: '1000',
        boxShadow: '0 0 5px #000',
        borderBottom: '1px solid #505050',
    }

    return (
        <div style={headerContainerStyle}>
            <h1>Reddit For You</h1>
        </div>
    )
}