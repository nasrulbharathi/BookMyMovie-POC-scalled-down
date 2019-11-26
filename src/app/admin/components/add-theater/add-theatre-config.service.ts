import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { CrudandFilterModel } from 'src/app/shared/table/model/table.model';

@Injectable()
export class AddTheaterConfigService {

    public readonly columHeaders = ['tid', 'name', 'city',
                                    'gLocation', 'capacity'];

    public readonly crudAndFilterData: CrudandFilterModel = {
        isAdd : true,
        isDelete: true,
        isEdit: true,
        filterColumns: ['name', 'city']
    };

    public addFormField = [
        {
            type: 'input',
            label: 'Theater ID',
            inputType: 'text',
            name: 'tid',
            validations:
            [
                {
                name: 'required',
                validator: Validators.required,
                message: 'Id Required'
                }
            ]
        },
        {
            type: 'input',
            label: 'Theater Name',
            inputType: 'text',
            name: 'name',
            validations:
            [
                {
                name: 'required',
                validator: Validators.required,
                message: 'Name Required'
                },
                {
                name: 'pattern',
                validator: Validators.pattern('^[a-zA-Z]+$'),
                message: 'Accept only text'
                }
            ]
        },
        {
            type: 'input',
            label: 'City',
            inputType: 'text',
            name: 'city',
            validations:
            [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'City Required'
                },
                {
                    name: 'pattern',
                    validator: Validators.pattern('^[a-zA-Z]+$'),
                    message: 'Accept only text'
                }
            ]
        },
        {
            type: 'input',
            label: 'G-Location path',
            inputType: 'text',
            name: 'gLocation',
            validations:
            [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'City Required'
                }
            ]
        },
        {
            type: 'input',
            label: 'Capacity',
            inputType: 'number',
            name: 'capacity',
            validations:
            [
                {
                name: 'required',
                validator: Validators.required,
                message: 'Name Required'
                },
                {
                name: 'pattern',
                validator: Validators.pattern('^[0-9]+$'),
                message: 'Accept only number'
                }
            ]
        }
    ];

    // TODO : Check for Optimization

    public editFormField = [
        {
            type: 'input',
            label: 'Theater ID',
            inputType: 'text',
            name: 'tid',
            validations:
            [
                {
                name: 'required',
                validator: Validators.required,
                message: 'Id Required'
                }
            ]
        },
        {
            type: 'input',
            label: 'Theater Name',
            inputType: 'text',
            name: 'name',
            validations:
            [
                {
                name: 'required',
                validator: Validators.required,
                message: 'Name Required'
                },
                {
                name: 'pattern',
                validator: Validators.pattern('^[a-zA-Z]+$'),
                message: 'Accept only text'
                }
            ]
        },
        {
            type: 'input',
            label: 'City',
            inputType: 'text',
            name: 'city',
            validations:
            [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'City Required'
                },
                {
                    name: 'pattern',
                    validator: Validators.pattern('^[a-zA-Z]+$'),
                    message: 'Accept only text'
                }
            ]
        },
        {
            type: 'input',
            label: 'G-Location path',
            inputType: 'text',
            name: 'gLocation',
            validations:
            [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'City Required'
                }
            ]
        },
        {
            type: 'input',
            label: 'Capacity',
            inputType: 'number',
            name: 'capacity',
            validations:
            [
                {
                name: 'required',
                validator: Validators.required,
                message: 'Name Required'
                },
                {
                name: 'pattern',
                validator: Validators.pattern('^[0-9]+$'),
                message: 'Accept only number'
                }
            ]
        }
    ];
}
