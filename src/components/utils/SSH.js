export  async function getssh() {
    const res = await fetch("http://localhost:5000/members")
    const resp = await res.json()
    return resp
}
export  async function postssh() {
    const value =("it work")
    const res = await fetch("http://localhost:5000/ssh",
        {
            method:'POST',
            body:JSON.stringify({
                value
            }),
            headers : {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(message=>console.log(message))
        .catch(error => console.log(error))
}