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
        height: 70,
        backgroundColor: '#f5f5f5',
        zIndex: '1000',
        boxShadow: '0 0 5px #ccc',
        borderBottom: '1px solid #ccc',
    }

    return (
        <div style={headerContainerStyle}>
            <h1>Reddit For You</h1>
        </div>
    )
}