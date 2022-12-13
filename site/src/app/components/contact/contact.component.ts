import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactFormData } from 'src/app/models/contact-form-data.model';
import { State } from 'src/app/models/state.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Output() public sendForm: EventEmitter<ContactFormData> = new EventEmitter<ContactFormData>();

  public btnDisabled = true;
  public formData!: ContactFormData;
  public form!: FormGroup;

  public states: State[] = [
    { nome: "Acre", sigla: "AC" },
    { nome: "Alagoas", sigla: "AL" },
    { nome: "Amapá", sigla: "AP" },
    { nome: "Amazonas", sigla: "AM" },
    { nome: "Bahia", sigla: "BA" },
    { nome: "Ceará", sigla: "CE" },
    { nome: "Distrito Federal", sigla: "DF" },
    { nome: "Espírito Santo", sigla: "ES" },
    { nome: "Goiás", sigla: "GO" },
    { nome: "Maranhão", sigla: "MA" },
    { nome: "Mato Grosso", sigla: "MT" },
    { nome: "Mato Grosso do Sul", sigla: "MS" },
    { nome: "Minas Gerais", sigla: "MG" },
    { nome: "Pará", sigla: "PA" },
    { nome: "Paraíba", sigla: "PB" },
    { nome: "Paraná", sigla: "PR" },
    { nome: "Pernambuco", sigla: "PE" },
    { nome: "Piauí", sigla: "PI" },
    { nome: "Rio de Janeiro", sigla: "RJ" },
    { nome: "Rio Grande do Norte", sigla: "RN" },
    { nome: "Rio Grande do Sul", sigla: "RS" },
    { nome: "Rondônia", sigla: "RO" },
    { nome: "Roraima", sigla: "RR" },
    { nome: "Santa Catarina", sigla: "SC" },
    { nome: "São Paulo", sigla: "SP" },
    { nome: "Sergipe", sigla: "SE" },
    { nome: "Tocantins", sigla: "TO" }
  ];

  constructor() { }

  ngOnInit() {
    this.buildForm();
    // console.log(this.form)

    setTimeout(() => {
      this.updateForm();
    }, 3000);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl({ value: 'teste@teste.com', disabled: true }),
      phone: new FormControl(),
      message: new FormControl(),
      address: new FormGroup({
        zipCode: new FormControl(),
        street: new FormControl(),
        number: new FormControl(),
        complement: new FormControl(),
        neighborhood: new FormControl(),
        city: new FormControl(),
        state: new FormControl()
      })
    });
  }

  private updateForm(): void {
    const client: ContactFormData = {
      name: 'Mateus Augusto',
      email: 'mateus@email.com',
      phone: '11985654'
    }

    this.form.patchValue(client); // Atualiza os campos do formulário, ignorando os campos que não foram passados
    // this.form.setValue(client); // Seta o valor de todo o formulário
  }

  public submitForm(): void {
    this.formData = this.form.getRawValue();
    console.log(this.formData);
  }

  public showInputData(event: any): void {
    console.log(event.target.value)
  }

}
