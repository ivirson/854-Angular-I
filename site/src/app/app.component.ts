import { Component } from '@angular/core';
import { Profiles } from './constants/profiles.enum';
import { AppData } from './models/app-data.model';
import { ContactFormData } from './models/contact-form-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public data: AppData = {
    features: {
      sectionTitle: 'Destaques',
      features: [
        {
          image: 'feature1.png',
          title: 'Destaque 1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dolor arcu, malesuada eget posuere et.',
          isActive: true
        },
        {
          image: 'feature2.png',
          title: 'Destaque 2',
          text: 'Aenean laoreet, felis id sollicitudin fringilla, leo orci iaculis eros, et volutpat nunc lacus ut sapien.',
          isActive: false
        },
        {
          image: 'feature3.png',
          title: 'Destaque 3',
          text: 'Aenean non eros congue leo consectetur fermentum. Quisque ut dignissim tortor, eget porttitor magna.',
          isActive: true
        },
        {
          image: 'feature4.png',
          title: 'Destaque 4',
          text: 'Duis id odio dapibus, finibus tortor eget, cursus nunc. Morbi egestas nisl orci, in cursus ipsum cursus et.',
          isActive: true
        }
      ]
    },
    about: {
      sectionTitle: 'Sobre a empresa',
      text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dolor arcu, malesuada eget posuere et, aliquam non elit. Sed maximus ullamcorper dui, ac sollicitudin quam molestie ac. Aenean laoreet, felis id sollicitudin fringilla, leo orci iaculis eros, et volutpat nunc lacus ut sapien. Aliquam velit justo, vestibulum et augue ut, efficitur ultrices justo. Aenean non eros congue leo consectetur fermentum. Quisque ut dignissim tortor, eget porttitor magna. Etiam sem turpis, aliquam sit amet nisi non, bibendum finibus neque. Duis id odio dapibus, finibus tortor eget, cursus nunc. Morbi egestas nisl orci, in cursus ipsum cursus et. Pellentesque in suscipit ipsum, vel auctor nisl. Quisque vitae vehicula velit. Integer dolor sapien, rutrum faucibus eros ac, hendrerit aliquet diam. Quisque non sem eu odio vestibulum facilisis ac aliquam tellus. Cras aliquet velit quis suscipit tincidunt. Phasellus ut aliquam nulla. </p> <p> Nam dictum diam nibh, id ultricies nunc rhoncus at. Nullam lobortis, erat vitae tempus semper, ante leo elementum odio, eu viverra nisi est in odio. Sed mi quam, ultrices vel placerat a, finibus ut neque. Curabitur eu leo eleifend, congue nisi et, vestibulum ex. Nulla hendrerit ex non orci dictum mattis. Fusce faucibus vitae massa nec fermentum. Nam tristique libero ac tellus vestibulum bibendum. Phasellus euismod, metus ut pretium vulputate, mi orci dignissim enim, id egestas augue ex in neque. Nulla ac dictum arcu, sit amet fringilla nisi. Duis elementum blandit nisi et ultrices. Morbi scelerisque auctor dui, egestas varius tellus. Sed id placerat felis. </p>'
    },
    address: {
      sectionTitle: "Endereço",
      data: {
        street: "Rua Luiz Galvez",
        number: 254,
        complement: "3º andar, sala 306",
        state: "AC",
        city: "Rio Branco",
        district: "Conjunto Castelo Branco",
        zipCode: "69911-262"
      }
    },
    header: {
      profile: Profiles.EMPLOYEE
    }
  }

  onElementCreated(element: string): void {
    console.log('Elemento criado:', element);
  }

  onContactFormSubmitted(formData: ContactFormData): void {
    console.log("Formulário enviado com sucesso!", formData);
  }

  onSearchSubmitted(text: string): void {
    console.log("Você buscou por:", text);
  }

}
