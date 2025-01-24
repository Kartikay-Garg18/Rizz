const asyncHandler = (reuqestHandler) => {
    return (req, res, next) => {
        Promise.resolve(reuqestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}