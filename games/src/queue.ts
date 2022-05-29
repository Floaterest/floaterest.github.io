/**
 * https://stackoverflow.com/a/30015136
 */
export class Queue<T>{
	stack1: T[] = [];
	stack2: T[] = [];

	constructor(...items: T[]){
		this.stack1 = items;
	}

	move2stack2(){
		while(this.stack1.length){
			this.stack2.push(this.stack1.pop());
		}
	}

	push(item: T){
		this.stack1.push(item);
	}

	shift(){
		if(!this.stack2.length) this.move2stack2();
		return this.stack2.length ? this.stack2.pop() : null;
	}

	get length(){
		return this.stack1.length + this.stack2.length;
	}
}