import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AddressComponent } from './components/address/address.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { PrevordersComponent } from './components/prevorders/prevorders.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifycodeComponent } from './components/verifycode/verifycode.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

export const routes: Routes = [
    {path:"" , redirectTo:"auth" , pathMatch:'full'},
    {path:"auth" , component:AuthLayoutComponent , children:[
        {path:"" , redirectTo:"signup", pathMatch:"full"},
        {path:"signup" , component:SignUpComponent},
        {path:"login" , component:SignInComponent},
        {path:"forgetpassword" , component:ForgetPasswordComponent},
        {path:"verifycode" , component:VerifycodeComponent},
        {path:"resetpassword" , component:ResetpasswordComponent},
        
]},
    {path:"main" , component:MainLayoutComponent , children:[
        {path:"", redirectTo:"home", pathMatch:'full'},
        {path:"home", component:HomeComponent},
        {path:"productDetails/:id", component:ProductDetailsComponent},
        {path:"brands", component:BrandsComponent},
        {path:"product", component:AllProductsComponent},
        {path:"Categories", component:CategoriesComponent},
        {path:"wishlist", component:WishListComponent},
        {path:"cart", component:CartComponent},
        {path:"address/:id", component:AddressComponent},
        {path:"prevorders", component:PrevordersComponent},
        {path:"allorders", component:AllordersComponent}
    ]},
    {path:'allorders', redirectTo:'main/allorders', pathMatch:'full'},    
    {path:'cart', redirectTo:'main/cart', pathMatch:'full'},    

    {path:"**" , component:NotFoundComponent}
];
