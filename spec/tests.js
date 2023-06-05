describe('generateHashTag', function () {
    it('should be a defined function', function () {
        expect(typeof generateHashTag).toBe('function');
    });
    // it('should return a string in hashtag format', function () {
    //     expect(generateHashTag("Hello World")).toBe("#HelloWorld");
    // });
    it('should return false for an empty string', function () {
        expect(generateHashTag("")).toBe(false);
    });
    it('should return false for a string that would generate a hashtag over 139 characters', function () {
        let longString = "a".repeat(140);
        expect(generateHashTag(longString)).toBe(false);
    });
})
