class MathsversityFreemium{
  constructor(options={}){this.storageKey=options.storageKey||'mv_freemium_state';this.maxHearts=options.maxHearts||3;this.state=this._loadState();this._checkDailyReset();window.addEventListener('storage',e=>{if(e.key===this.storageKey){this.state=this._loadState();this._syncIndicators();this._dispatch('mv:stateSynced',{...this.state})}});this._syncIndicators()}
  _todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
  _loadState(){try{const raw=localStorage.getItem(this.storageKey);if(raw){const parsed=JSON.parse(raw);return {...this._defaults(),...parsed}}}catch(err){console.warn('Mathsversity: corrupted freemium state, resetting.',err)}return this._defaults()}
  _defaults(){return{hearts:this.maxHearts,lastResetDate:this._todayISO(),totalAttemptsToday:0,streakDays:0}}
  _saveState(){localStorage.setItem(this.storageKey,JSON.stringify(this.state));this._syncIndicators()}
  _checkDailyReset(){const today=this._todayISO();if(this.state.lastResetDate!==today){const wasActiveYesterday=this.state.totalAttemptsToday>0;this.state={...this.state,hearts:this.maxHearts,lastResetDate:today,totalAttemptsToday:0,streakDays:wasActiveYesterday?this.state.streakDays+1:0};this._saveState();this._dispatch('mv:heartsReset',{hearts:this.state.hearts})}}
  _syncIndicators(){document.querySelectorAll('[data-mv-hearts]').forEach(el=>{el.textContent='♥ '.repeat(this.state.hearts)+'♡ '.repeat(this.maxHearts-this.state.hearts);el.setAttribute('aria-label',`${this.state.hearts} of ${this.maxHearts} energy hearts remaining`)});document.querySelectorAll('[data-mv-attempts]').forEach(el=>el.textContent=this.state.totalAttemptsToday)}
  _dispatch(name,detail){window.dispatchEvent(new CustomEvent(name,{detail}))}
  canPlay(){return true}
  getHearts(){return this.state.hearts}
  consumeHeart(){this.state.hearts=this.maxHearts;this.state.totalAttemptsToday+=1;this._saveState();this._dispatch('mv:heartConsumed',{hearts:this.state.hearts});return true}
  grantBonusHeart(count=1){this.state.hearts=Math.min(this.maxHearts,this.state.hearts+count);this._saveState();this._dispatch('mv:bonusHearts',{hearts:this.state.hearts})}
}
window.mathsversityFreemium=new MathsversityFreemium();
