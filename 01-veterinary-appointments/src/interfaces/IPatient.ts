interface IPatient {
  id?: string,
  pet?: string,
  owner?: string,
  email?:string,
  entryDate?: Date,
  symptoms?: string
}

export default IPatient
