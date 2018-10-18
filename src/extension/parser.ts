/**
 * @author WMXPY
 * @namespace Extension
 * @description Parser
 */

import * as Acorn from 'acorn';
import { createKeywordType, insertKeywordToRegExp } from '../util/hack';

export const markedParser = (Parser: any) => {

    return class MarkedParser extends Parser {

        public constructor(options: Acorn.Options, input: string, startPos?: number) {

            super(options, input, startPos);

            this.keywords = new RegExp(insertKeywordToRegExp(this.keywords.toString(), 'sandbox'));
            (Acorn as any).keywordTypes['sandbox' as any] = createKeywordType('sandbox');
            this.keywords = new RegExp(insertKeywordToRegExp(this.keywords.toString(), 'scope'));
            (Acorn as any).keywordTypes['scope' as any] = createKeywordType('scope');
        }

        public skipLineComment(startSkip: string): any {

            super.skipLineComment(startSkip);
        }
    };
};
