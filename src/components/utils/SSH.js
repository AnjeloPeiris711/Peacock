export default async function getssh() {
    const res = await fetch("http://localhost:5000/members")
    const resp = await res.json()
    return resp
}