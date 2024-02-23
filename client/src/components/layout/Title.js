const Title = () => {
    const styles = getStyles()

    return <h1 style={styles.title}>People and their cars</h1>
}

const getStyles = () => ({
    title: {
        fontSize: 20,
        textTransform: 'uppercase',
        padding: '15px',
    }
})

export default Title