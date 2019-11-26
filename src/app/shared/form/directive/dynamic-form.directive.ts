import { Input, Directive, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormFieldConfig } from '../form-config.interface';
import { TextComponent } from '../text/text.component';
import { ComboboxComponent } from '../combobox/combobox.component';

const componentMapper = {
    input: TextComponent,
    select: ComboboxComponent
};

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[dynamicFormDirective]'
})
export class DynamicFormDirective implements OnInit  {
    @Input()
    public field: FormFieldConfig;
    @Input()
    public group: FormGroup;

    public componentRef: any;

    constructor(private resolver: ComponentFactoryResolver,
                private container: ViewContainerRef) { }

    public ngOnInit(): void {
        const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}
