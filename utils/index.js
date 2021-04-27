module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isUser: user => user && user.role === 'USER',
    isOwner: user => user && user.role === 'OWNER',
    isLogged: user => req.session.currentUser
}