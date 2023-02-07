export function truncate(input: string, length = 35) {
    if (input.length <= length) {
        return input
    }

    return input.substring(0, length - 10) + '...' + input.substring(input.length - 1 - 7, input.length - 1)
}


export function copy(input: string){
    const temp = document.createElement('input');
    document.body.append(temp)
    temp.value = input

    temp.select();
    document.execCommand("copy");

    temp.remove();
}