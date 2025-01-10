"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileHandler_1 = require("../FileHandler");
const Project_1 = require("../Project");
const fs = require('fs');
jest.mock('fs');
describe('test write to file', () => {
    let fileHandler;
    beforeEach(() => {
        fileHandler = new FileHandler_1.FileHandler();
        fs.writeFileSync;
    });
    test('should write content to a file', () => {
        const project = new Project_1.Project("Test Project");
        fileHandler.writeJSON([project]);
        expect(fs.writeFileSync).toHaveBeenCalledWith('data/projects.json', JSON.stringify([project], null, 2));
    });
});
