const Storage =  {}

Storage.get =  async (name) =>{
    return await JSON.parse( localStorage.getItem(name))
}

Storage.set = async (name, val) =>{
  await localStorage.setItem(name, JSON.stringify(val))
}

Storage.add = async (name, addVal)=> {
    let oldVal = await Storage.get(name)
    let newVal = await oldVal.concat(addVal)
    await Storage.set(name, newVal)
}

export default Storage