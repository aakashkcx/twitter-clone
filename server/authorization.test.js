const authorization = require("./authorization")
// @ponicode
describe("authorization", () => {
    test("0", () => {
        let callFunction = () => {
            authorization({ user: "user_name", header: () => "https://accounts.google.com/o/oauth2/revoke?token=%s" }, { status: () => 404 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            authorization({ user: "user-name", header: () => "https://croplands.org/app/a/reset?token=" }, { status: () => 500 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            authorization({ user: "user name", header: () => "http://www.croplands.org/account/confirm?t=" }, { status: () => 400 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            authorization({ user: "user-name", header: () => "https://twitter.com/path?abc" }, { status: () => 400 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            authorization({ user: "user-name", header: () => "https://croplands.org/app/a/confirm?t=" }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            authorization(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
