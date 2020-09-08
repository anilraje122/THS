function getUser() {
    setTimeout(() => {
        const userids = [10,20,30,40];
        console.log(userids);
        setTimeout((id)=> {
            const user = {
                name : 'john',
                age : 25
            };
            console.log(`user id : ${id} : user name : ${user.name} : user age : ${user.age}`);
            setTimeout((age) => {
                console.log(user);
            }, 1000, user.age);
        }, 1000, userids[3]);
    }, 1500);
}

getUser();