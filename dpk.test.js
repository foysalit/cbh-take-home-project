const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key when passed in and is below 256 chars", () => {
    const event = {partitionKey: 'test'};
    expect(deterministicPartitionKey(event)).toEqual(event.partitionKey);
  });

  it("Returns generated key when partition key longer than 256 chars is passed in", () => {
    // easier than typing out text that is 256 chars long
    const longTextFragment = 'this is a very very long text which should definitely definitely definitely definitely definitely definitely definitely definitely definitely be above 256 chars';
    const event = {partitionKey: longTextFragment+longTextFragment};
    const generatedKey = deterministicPartitionKey(event);
    expect(generatedKey).not.toEqual(event.partitionKey);
  });

  it("Returns stringified key when non string partition key is passed in", () => {
    const arrayKey = {partitionKey: ['x', 'y']};
    expect(deterministicPartitionKey(arrayKey)).toEqual(JSON.stringify(arrayKey.partitionKey));
    const objectKey = {partitionKey: ['x', 'y']};
    expect(deterministicPartitionKey(objectKey)).toEqual(JSON.stringify(objectKey.partitionKey));
  });

  it("Returns generated key when non string partition key longer than 256 chars is passed in", () => {
    const longTextFragment = 'this is a very very long text which should definitely definitely definitely definitely definitely definitely definitely definitely definitely be above 256 chars';
    const arrayKey = {partitionKey: [longTextFragment, longTextFragment]};
    expect(deterministicPartitionKey(arrayKey)).not.toEqual(JSON.stringify(arrayKey.partitionKey));
  });
});
