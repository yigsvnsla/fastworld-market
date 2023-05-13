import { ModalImageEditorComponent } from '../modal-image-editor/modal-image-editor.component';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragMove, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

/**
 * ! arreglar la recarga del ngFor al cargar la imagen
 */

@Component({
  selector: 'app-dragable-grid',
  templateUrl: './dragable-grid.component.html',
  styleUrls: ['./dragable-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragableGridComponent implements OnInit {


  @ViewChild(CdkDropListGroup) public listGroup!: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) public placeholder!: CdkDropList;

  public items : any[];
  public target: CdkDropList | undefined | null;
  public targetIndex: number;
  public source: CdkDropList | undefined | null;
  public sourceIndex: number;
  public activeContainer: CdkDropList | undefined | null
  // public dragIndex: number;
  public form: FormArray
  public pressedCard: boolean
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.target = undefined;
    this.targetIndex = 0;
    this.source = undefined;
    this.sourceIndex = 0;
    // this.dragIndex = 0
    this.activeContainer = undefined;
    this.items = new Array(9)
    this.form = this.formBuilder.array([])
    this.pressedCard = false
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // parece que : setea un elemento a modo de configuracion y lo borra :v
    let phElement = this.placeholder.element.nativeElement;
    phElement.style.setProperty('display', 'none')
    // phElement.style.setProperty('background', 'red')
    phElement.parentElement?.removeChild(phElement)
  }

  dropListDropped() {
    if (!this.target) { return; }

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent!.removeChild(phElement);
    parent!.appendChild(phElement);
    parent!.insertBefore(this.source!.element.nativeElement, parent!.children[this.sourceIndex]);

    this.target = null;
    this.source = null;
    this.activeContainer = null;

    if (this.sourceIndex != this.targetIndex) { moveItemInArray(this.items, this.sourceIndex, this.targetIndex); }
  }

  entered($event: CdkDragEnter<any>): boolean | void {

    console.log('entered');
    const drag = $event.item;
    const drop = $event.container;

    if (drop === this.placeholder) { return true }

    const phElement = this.placeholder.element.nativeElement;
    const sourceElement = drag.dropContainer.element.nativeElement;

    const dropElement = drop.element.nativeElement;
    const dragIndex = this.indexOf(dropElement.parentElement?.children, this.source ? phElement : sourceElement);
    const dropIndex = this.indexOf(dropElement.parentElement?.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;
      phElement.style.width = dropElement.clientWidth / 2 + 'px';
      phElement.style.height = dropElement.clientHeight + 'px';
      sourceElement.parentElement?.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;
    phElement.style.display = '';
    dropElement.parentElement?.insertBefore(phElement, dropIndex > dragIndex ? dropElement.nextSibling : dropElement);

    requestAnimationFrame(() => {
      this.placeholder._dropListRef.enter(
        drag._dragRef,
        drag.element.nativeElement.offsetLeft,
        drag.element.nativeElement.offsetTop
      );
    });
  }

  private indexOf(collection: any, node: any) {
    return Array.prototype.indexOf.call(collection, node);
  }

  public deleteImage(index:number){
    delete this.items[index]
  }

  public addImage(index:number){
    this.openEditor(index)
  }

  private async openEditor(index:number){
    const modal = await this.modalController.create({
      component:ModalImageEditorComponent,
      keyboardClose:true,
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm'){
      let result = {url: data.url.changingThisBreaksApplicationSecurity, blob: data.blob}
      // this.items[index] = result
      this.items = [...this.items, result]
    }
  }

  public trackBy(index:number, item:any){
    return index
  }

  public addControl(){
    this.form.push(new FormControl('dasdas',{}))


    console.log(this.form.value);

  }



  test(){
    // this.addControl()

    this.items = [...this.items]
  }
}
