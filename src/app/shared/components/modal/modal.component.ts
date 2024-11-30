import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    isOpen = false;
    private element: any;

    constructor(
        private modalService: ModalService,
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit() {

        if (isPlatformBrowser(this.platformId)) {
            this.modalService.add(this);
            document.body.appendChild(this.element);
            this.element.addEventListener('click', (el: any) => {
                if (el.target.className === 'app-modal') {
                    this.close();
                }
            });
        }
    }

    ngOnDestroy() {
        this.modalService.remove(this);
        this.element.remove();
    }

    open() {
        this.element.style.display = 'block';
        document.body.classList.add('app-modal-open');
        this.isOpen = true;
    }

    close() {
        this.element.style.display = 'none';
        document.body.classList.remove('app-modal-open');
        this.isOpen = false;
    }
}
