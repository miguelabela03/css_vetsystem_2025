export class AppointmentAddUpdate {
    private _animalType: string;
    private _appointmentDate: string;
    private _appointmentDuration: number;
    private _appointmentTime: string;
    private _ownerContactNumber: string;
    private _ownerIdCardNumber: string;
    private _ownerName: string;
    private _ownerSurname: string;
    private _patientName: string;
    private _reasonForAppointment: string;
    private _vetNotes: string;

    constructor(
        animalType: string,
        appointmentDate: string,
        appointmentDuration: number,
        appointmentTime: string,
        ownerContactNumber: string,
        ownerIdCardNumber: string,
        ownerName: string,
        ownerSurname: string,
        patientName: string,
        reasonForAppointment: string,
        vetNotes: string,
    ) {
        this._animalType = animalType;
        this._appointmentDate = appointmentDate;
        this._appointmentDuration = appointmentDuration;
        this._appointmentTime = appointmentTime;
        this._ownerContactNumber = ownerContactNumber;
        this._ownerIdCardNumber = ownerIdCardNumber;
        this._ownerName = ownerName;
        this._ownerSurname = ownerSurname;
        this._patientName = patientName;
        this._reasonForAppointment = reasonForAppointment;
        this._vetNotes = vetNotes;
    }

    public get animalType(): string {
        return this._animalType;
    }

    public set animalType(animalType: string) {
        this._animalType = animalType;
    }

    public get appointmentDate(): string {
        return this._appointmentDate;
    }

    public set appointmentDate(appointmentDate: string) {
        this._appointmentDate = appointmentDate;
    }

    public get appointmentDuration(): number {
        return this._appointmentDuration;
    }

    public set appointmentDuration(appointmentDuration: number) {
        this._appointmentDuration = appointmentDuration;
    }

    public get appointmentTime(): string {
        return this._appointmentTime;
    }

    public set appointmentTime(appointmentTime: string) {
        this._appointmentTime = appointmentTime;
    }

    public get ownerContactNumber(): string {
        return this._ownerContactNumber;
    }

    public set ownerContactNumber(ownerContactNumber: string) {
        this._ownerContactNumber = ownerContactNumber;
    }

    public get ownerIdCardNumber(): string {
        return this._ownerIdCardNumber;
    }

    public set ownerIdCardNumber(ownerIdCardNumber: string) {
        this._ownerIdCardNumber = ownerIdCardNumber;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(ownerName: string) {
        this._ownerName = ownerName;
    }

    public get ownerSurname(): string {
        return this._ownerSurname;
    }

    public set ownerSurname(ownerSurname: string) {
        this._ownerSurname = ownerSurname;
    }

    public get patientName(): string {
        return this._patientName;
    }

    public set patientName(patientName: string) {
        this._patientName = patientName;
    }

    public get reasonForAppointment(): string {
        return this._reasonForAppointment;
    }

    public set reasonForAppointment(reasonForAppointment: string) {
        this._reasonForAppointment = reasonForAppointment;
    }

    public get vetNotes(): string {
        return this._vetNotes;
    }

    public set vetNotes(vetNotes: string) {
        this._vetNotes = vetNotes;
    }
}