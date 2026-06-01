'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    let name=['N','NbE','NNE','NEbN','NE','NEbE','ENE','EbN',
			  'E','EbS','ESE','SEbE','SE','SEbS','SSE','SbE',
			  'S','SbW','SSW','SWbS','SW','SWbW','WSW','WbS',
			  'W','WbN','WNW','NWbW','NW','NWbN','NNW','NbW'];
	let result=[];
	for (let i=0;i<32;i++) {
		result.push({
			abbreviation:name[i],
			azimuth:11.25*i
		});
	}
	return result;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
	let result=[];
	function find(str) {
		let start=str.lastIndexOf('{');
		if (start<0) {
			result.push(str);
			return str;
		}
		let count=0;
		let end=-1;
		for (let i=start+1;i<str.length;i++) {
			if (str[i]=='{') count++;
			if (str[i]=='}'&&count==0) {end=i; break;}
			if (str[i]=='}') count--;
		}
		let begin_str=str.slice(0,start);
		let str_opt=str.slice(start+1,end);
		let options=str_opt.split(',');
		let end_str=str.slice(end+1,str.length);
		for (let opt of options) {
			let next_str=begin_str+opt+end_str;
			find(next_str);
		}
	}
	find(str);
	let uniq=new Set(result);
	for (let variant of uniq) {
			yield variant;
		}
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let result=[];
	for (let i=0;i<n;i++) result[i]=[];
	let direction=1,pos_x=0,pos_y=0,num=0;
	while (num<n*n-1) {
		result[pos_x][pos_y]=num++;
		if (direction) {
			pos_x--; pos_y++;
			if (pos_x<0||pos_y==n) {
				direction=0;
				if (pos_x<0&&pos_y!=n) pos_x=0;
				if (pos_y==n) {pos_y=n-1; pos_x+=2;}
			}
		} else {
			pos_x++; pos_y--;
			if (pos_x==n||pos_y<0) {
				direction=1;
				if (pos_y<0&&pos_x!=n) pos_y=0;
				if (pos_x==n) {pos_x=n-1; pos_y+=2;}
			}
		}
	}
	result[n-1][n-1]=num;
	return result;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let tail1=dominoes[0][0],tail2=dominoes[0][1];
	dominoes[0][0]=-1; dominoes[0][1]=-1;
	for (let i=1;i<dominoes.length;i++) {
		let find=0;
		for (let i2=1;i2<dominoes.length;i2++) {
			if (dominoes[i2][0]==tail1) {
				tail1=dominoes[i2][1];
				dominoes[i2][0]=dominoes[i2][1]=-1;
				find=1; break;
			}
			if (dominoes[i2][1]==tail1) {
				tail1=dominoes[i2][0];
				dominoes[i2][0]=dominoes[i2][1]=-1;
				find=1; break;
			}
			if (dominoes[i2][0]==tail2) {
				tail2=dominoes[i2][1];
				dominoes[i2][0]=dominoes[i2][1]=-1;
				find=1; break;
			}
			if (dominoes[i2][1]==tail2) {
				tail2=dominoes[i2][0];
				dominoes[i2][0]=dominoes[i2][1]=-1;
				find=1; break;
			}
		}
		if (find==0) return false;
	}
	return true;
}



/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let result='';
	for (let i=0;i<nums.length;i++) {
		result+=nums[i];
		if (i==nums.length-1) break;
		if (nums[i]+1!=nums[i+1]) {
			result+=',';
		} else if (nums[i]+2!=nums[i+2]) {
			result=result+',';
		} else {
			result+='-';
			while (1) {
				if (nums[i]+1==nums[i+1]) i++; else {i--; break;}
			}
		}
	}
	return result;
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
