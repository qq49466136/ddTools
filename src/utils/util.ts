import { format } from 'sql-formatter'
function sortJsonObjectKeysRecursively(jsonObject: any): any {
    if (jsonObject && typeof jsonObject === 'object') {
        if (Array.isArray(jsonObject)) {
            // 如果对象是数组，则递归处理数组中的每个元素
            return jsonObject.map(item => sortJsonObjectKeysRecursively(item));
        } else {
            // 如果对象是非数组对象，则排序键并递归处理值
            const sortedObject: { [key: string]: any } = {};
            const sortedKeys = Object.keys(jsonObject).sort();
 
            sortedKeys.forEach(key => {
                sortedObject[key] = sortJsonObjectKeysRecursively(jsonObject[key]);
            });
 
            return sortedObject;
        }
    }
    // 如果不是对象，则直接返回值
    return jsonObject;
}
 
function sortJsonString(jsonString: string): string {
    try {
        // 将 JSON 字符串解析为 JavaScript 对象
        const jsonObject = JSON.parse(jsonString);
 
        // 递归地排序对象键
        const sortedJsonObject = sortJsonObjectKeysRecursively(jsonObject);
 
        // 将排序后的对象转换回 JSON 字符串
        return sortedJsonObject; // 2 是缩进级别，可以根据需要调整
    } catch (error: any) {
        // 如果解析 JSON 字符串时出错，则抛出错误
        throw new Error(`Invalid JSON string: ${error.message}`);
    }
}




declare global {
    interface String {
        removeLineEnd(): string;
    }
}

String.prototype.removeLineEnd = function () {
    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2');
};
function formatXml(text:string) {
    //去掉多余的空格
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function (_, name, props) {
        return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
    }).replace(/>\s*?</g, ">\n<");

    
    //把注释编码
    text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, 
        function (_, text) {
            return '<!--' + escape(text) + '-->';
        }
    ).replace(/\r/g, '\n');

    //调整格式
    let rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    let nodeStack:string[] = [];
    let output = text.replace(rgx, function (_, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        let isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/') || (isFull1 == '/') || (isFull2 == '/');
        let prefix = '';
        if (isBegin == '!') {
            prefix = getPrefix(nodeStack.length);
        }
        else {
            if (isBegin != '/') {
                prefix = getPrefix(nodeStack.length);
                if (!isClosed) {
                    nodeStack.push(name);
                }
            }
            else {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }

        }
        let ret = '\n' + prefix + all;
        return ret;
    });

    let outputText = output.substring(1);
    //alert(outputText);

    //把注释还原并解码，调格式
    outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function (_, prefix, text) {

        if (prefix.charAt(0) == '\r')
            prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g, '\n');
        let ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
        return ret;
    });

    return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}
function getPrefix(prefixIndex:number) {
    let span = '    ';
    let output = [];
    for (let i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }

    return output.join('');
}



const formatSql = (sql: string) => {
    if (!format) return;
    return format(sql, { language: 'sql', keywordCase: 'upper', tabWidth: 2 });
}

const formatStr = (str: string, type: string) => {
    if (type === 'xml' || type === 'html') {
        return formatXml(str);
    } else if (type === 'sql') {
        return formatSql(str);
    } else if (type === 'json') {
        // return JSON.stringify(sortJsonObject(str), null, 2);
        return JSON.stringify(sortJsonString(str), null, 2);
    }
}

export { formatStr }