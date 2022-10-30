import RedditCategorySelector from './RedditCategorySelector';

export default function Header() {
    
    const headerContainerStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        flexDirection: 'row',
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

    const h1Style = {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginRight: '10%',
        padding: '20px 5px',
    }

    return (
        <div style={headerContainerStyle}>
            <h1 style={h1Style}>Reddit For You</h1>
            <RedditCategorySelector />
        </div>
    )
}