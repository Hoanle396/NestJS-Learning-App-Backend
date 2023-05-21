import { Injectable } from '@nestjs/common';
import { PythonShell, Options } from 'python-shell';

@Injectable()
export class PythonService {
  async runScript(scriptPath: string, options?: Options) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await PythonShell.run(scriptPath, options ?? {});
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
