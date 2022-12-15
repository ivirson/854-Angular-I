import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
    { nome: 'Acre', sigla: 'AC' },
    { nome: 'Alagoas', sigla: 'AL' },
    { nome: 'Amapá', sigla: 'AP' },
    { nome: 'Amazonas', sigla: 'AM' },
    { nome: 'Bahia', sigla: 'BA' },
    { nome: 'Ceará', sigla: 'CE' },
    { nome: 'Distrito Federal', sigla: 'DF' },
    { nome: 'Espírito Santo', sigla: 'ES' },
    { nome: 'Goiás', sigla: 'GO' },
    { nome: 'Maranhão', sigla: 'MA' },
    { nome: 'Mato Grosso', sigla: 'MT' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { nome: 'Minas Gerais', sigla: 'MG' },
    { nome: 'Pará', sigla: 'PA' },
    { nome: 'Paraíba', sigla: 'PB' },
    { nome: 'Paraná', sigla: 'PR' },
    { nome: 'Pernambuco', sigla: 'PE' },
    { nome: 'Piauí', sigla: 'PI' },
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Rio Grande do Norte', sigla: 'RN' },
    { nome: 'Rio Grande do Sul', sigla: 'RS' },
    { nome: 'Rondônia', sigla: 'RO' },
    { nome: 'Roraima', sigla: 'RR' },
    { nome: 'Santa Catarina', sigla: 'SC' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Sergipe', sigla: 'SE' },
    { nome: 'Tocantins', sigla: 'TO' }
  ];

  constructor() { }

  ngOnInit() {
    this.buildForm();
    this.setFormSubscription();
    // console.log(this.form)

    setTimeout(() => {
      // this.updateForm();
    }, 3000);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-ZÀ-ÿ]{2,}(?: [a-zA-ZÀ-ÿ]+){1,}$')
      ]),
      email: new FormControl({ value: 'testeteste.com', disabled: false }, [
        Validators.email,
        Validators.maxLength(60),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$')
        // Validators.pattern('^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$')
      ]),
      document: new FormControl(null, [
        Validators.required,
        documentValidator
      ]),
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

  private setFormSubscription(): void {
    this.form.valueChanges
      .subscribe(
        () => {
          console.log(this.form)
        }
      )
  }

  public submitForm(): void {
    this.formData = this.form.getRawValue();
    console.log(this.formData);
  }

  public showInputData(event: any): void {
    console.log(event.target.value)
  }

}

function documentValidator(control: FormControl) {
  if (!control || !control.value) return { 'invalidDocument': true };

  return control.value.length === 11
    ? cpfValidator(control.value)
    : cnpjValidator(control.value);
}

function cnpjValidator(cnpj: string) {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if(cnpj == '') return { 'invalidDocument': true };
  if (cnpj.length != 14) return { 'invalidDocument': true };

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return { 'invalidDocument': true };

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0,tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != +digitos.charAt(0)) return { 'invalidDocument': true };

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != +digitos.charAt(1))
        return { 'invalidDocument': true };

  return null;
}

function cpfValidator(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g,'');
  if (cpf == '') return { 'invalidDocument': true };

  // Elimina CPFs invalidos conhecidos
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return { 'invalidDocument': true };

  // Valida 1o digito
  let add = 0;

  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) rev = 0;

  if (rev != parseInt(cpf.charAt(9))) return { 'invalidDocument': true };

  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);

  if (rev == 10 || rev == 11)	rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return { 'invalidDocument': true };

  return null;
}
