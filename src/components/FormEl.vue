<template>
    <div>
        <h2 class="text-center display-4">Добавить нового студента</h2>
        
        <form v-on:submit.prevent="onValid()" class="form-row col-md-12">
        

        <div class="form-group col-md-6">
            <label for="newClientName">Имя</label>

            <input type="text" class="form-control input-sm" id="newClientName" 
            v-model="form.name"
            :class="$v.form.name.$error ? 'is-invalid' : ''"
            >

            <span class="text-danger" 
            v-if="$v.form.name.$dirty && !$v.form.name.required"
            >{{msgRequired}}</span>

            <span class="text-danger" 
            v-if="$v.form.name.$dirty && !$v.form.name.minLength"
            >{{msgMinLengthText}}<br></span>

            <span class="text-danger" 
            v-if="$v.form.name.$dirty && !$v.form.name.alpha"
            >{{msgAlpha}}</span> 
        </div>

        <div class="form-group col-md-6">
            <label for="newClientSurname">Фамилия</label>

            <input type="text" class="form-control" id="newClientSurname" 
            :class="$v.form.surname.$error ? 'is-invalid' : ''"
            v-model="form.surname">
                
            <span class="text-danger" 
                v-if="$v.form.surname.$dirty && !$v.form.surname.required"
            >{{msgRequired}}<br></span>

            <span class="text-danger" 
                v-if="$v.form.surname.$dirty && !$v.form.surname.minLength"
            >{{msgMinLengthText}}<br></span>

            <span class="text-danger" 
                v-if="$v.form.surname.$dirty && !$v.form.surname.alpha"
            >{{msgAlpha}}</span>
        </div>


        <div class="form-group col-3">
            <label for="newClientDateBirth">Дата рождения</label>

            <input type="date" class="form-control" v-model="form.dateBirth"
            :class="$v.form.dateBirth.$error ? 'is-invalid' : ''"
            >
            
            <span class="text-danger" 
                v-if="$v.form.dateBirth.$dirty && !$v.form.dateBirth.required"
            >{{msgRequired}}</span>
            </div>


            <div class="form-group col-4">
                <label for="newClientName">Номер телефона</label>

                <input type="number" class="form-control" id="newClientName" 
                :class="$v.form.phoneNumber.$error ? 'is-invalid' : ''"
                v-model="form.phoneNumber"
                >
                
                <span class="text-danger" 
                    v-if="$v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required"
                >{{msgRequired}}<br></span>

                <span class="text-danger" 
                    v-if="($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.maxLength) ||
                    ($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.minLength) ||
                    ($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.numeric) ||
                    ($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.isPhone)"
                >{{msgNum}}</span>
        </div>

        <div class="form-group col-5">
            <label for="newClientEmail">Электронная почта</label>

            <input type="email" class="form-control" id="newClientEmail" 
            :class="$v.form.email.$error ? 'is-invalid' : ''"
            v-model="form.email">
            
            <span class="text-danger" 
                v-if="$v.form.email.$dirty && !$v.form.email.required"
            >{{msgRequired}}</span>

            <span class="text-danger" 
            v-if="$v.form.email.$dirty && !$v.form.email.email"
            >{{msgEmail}}</span>
        </div>

        <div class="form-group col-sm-12">
            <hr>
            <h3 class="text-center ">Выберите секции:</h3><br><br>
            <div class="form-check d-inline-block col-3">
                <input type="checkbox" class="form-check-input" id="acceptFoootballSection" checked :value="'Футбол'" v-model="form.sections">
                <label for="acceptFoootballSection" class="form-check-label">Футбол</label>
            </div>

            <div class="form-check d-inline-block col-3">
                <input type="checkbox" class="form-check-input" id="acceptBoxingSection" checked :value="'Бокс'" v-model="form.sections">
                <label for="acceptBoxingSection" class="form-check-label">Бокс</label>
            </div>

            <div class="form-check d-inline-block col-3">
                <input type="checkbox" class="form-check-input" id="acceptChessSection" checked :value="'Шахматы'" v-model="form.sections">
                <label for="acceptChessSection" class="form-check-label">Шахматы</label>
            </div>

            <div class="form-check d-inline-block col-3">
                <input type="checkbox" class="form-check-input" id="acceptDrawSection" checked :value="'Рисование'" v-model="form.sections">
                <label for="acceptDrawSection" class="form-check-label">Рисование</label>
            </div><hr>
        </div>


        <div class="form-group row">
        <div class="col-sm-6">
            <button class="btn btn-success" type="submit">Отправить</button>
        </div>
            </div> 
        </form>
    </div>

    
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, numeric, maxLength, email, helpers} from 'vuelidate/lib/validators'
import Student from '.././classes/student.js'

function isPhone(phone) {
    return phone[0] === '7' 
} 

const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/);

export default {
    name: 'FormEl',
    mixins: [validationMixin],
    validations: {
        form: {
            name: {
                required,
                minLength: minLength(2),
                alpha
            },
            surname: {
                required,
                minLength: minLength(2),
                alpha
            },
            email: {
                email,
                required
            },
            phoneNumber: {
                numeric,
                required,
                maxLength: maxLength(11),
                minLength: minLength(11),
                isPhone
            },
            dateBirth: {
                required
            }
        }
     },
    data() {
    return {
        msgAlpha: 'В поле не должны быть числа и спец.символы',
        msgRequired: 'Поле обязательно для заполнения',
        msgEmail: 'Адрес электронной почты должен содержать символ "@"!',
        msgMinLengthText: 'Минимальное кол-во символов - 2',
        msgNum: 'Номер телефона должен начинаться с 7 и содержать 11 цифр',
        form: {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '7',
            dateBirth: '',
            sections: [] 
        }
    }
    },
    methods: {
        onValid() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid || this.$v.form.$error) {
                this.form.submitStatus = 'ERORR'
            } else {
                this.form.submitStatus = 'OK';
                let id = (new Date).getTime() + Math.floor(Math.random() * 100000);
                const student = new Student(id, this.form.name, this.form.surname, 
                                            this.form.email, this.form.phoneNumber, 
                                            this.form.dateBirth, this.form.sections,
                                            );
                this.$emit('add-student', student);
                setTimeout(this.resetForm, 500);

            }
        },
        resetForm() {
            this.form.name = '';
            this.form.surname = '';
            this.form.email = '';
            this.form.phoneNumber = '7';
            this.form.dateBirth = '';
            this.form.sections = []
            this.$v.form.$reset();
        }
    }
}
</script>