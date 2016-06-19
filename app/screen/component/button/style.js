const buttonSize = 44;
const buttonOffset = 15;

//float button
export default StyleSheet.create({
    container: {
        position: 'absolute',
        height: buttonSize,
        width: buttonSize,
        borderRadius: buttonSize / 2,
        backgroundColor: 'rgba(9,160,151,0.7)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    positionLeft: {
        left: buttonOffset,
        bottom: buttonOffset
    },
    positionRight: {
        right: buttonOffset,
        bottom: buttonOffset
    },
    icon: {
        color: 'rgba(255,255,255, 1)'
    },
    text: {
        color: 'rgba(255,255,255, 1)'
    }
});