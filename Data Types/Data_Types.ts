export class Kata {
    // Printing Array elements with Comma delimiters
    static printArray = (numArr: any[]) => numArr.join(',');

    // Opposite number
    static opposite = (n: number) => n * (-1);

    //Basic Mathematical Operations
    static basicOp = (operation: string, val1: number, val2: number): number => eval(val1 + '' + operation + '' + val2);

    //Transportation on vacation
    static rentalCarCost = (days: number) => {
        var rentalCost = days * 40;
        if (days >= 3 && days < 7) {
            return rentalCost - 20;
        } else if (days >= 7) {
            return rentalCost - 50;
        }
        return rentalCost;
    }
}
