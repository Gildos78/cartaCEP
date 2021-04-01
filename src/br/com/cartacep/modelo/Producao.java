package br.com.cartacep.modelo;

import java.io.Serializable;
import java.util.Date;

public class Producao implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int id;
	private String codigo;
	private String cliente;
	private String dataInicio;
	private String dataFinal;
	private String descricao;
	private int numAmostras;
	private int subgrupo;
	private int operacaoId;
	private String operacao;
	private int maquinaId;
	private String maquina;
	private int codeRefEsp;
	private int idSub;
	private int totalAmostras;
	private int totalEsp;
	private Boolean statusFull;
	private int contagemAtual;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getCliente() {
		return cliente;
	}
	public void setCliente(String cliente) {
		this.cliente = cliente;
	}
	public String getDataInicio() {
		return dataInicio;
	}
	public void setDataInicio(String dataInicio) {
		this.dataInicio = dataInicio;
	}
	public String getDataFinal() {
		return dataFinal;
	}
	public void setDataFinal(String dataFinal) {
		this.dataFinal = dataFinal;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public int getNumAmostras() {
		return numAmostras;
	}
	public void setNumAmostras(int numAmostras) {
		this.numAmostras = numAmostras;
	}
	public int getSubgrupo() {
		return subgrupo;
	}
	public void setSubgrupo(int subgrupo) {
		this.subgrupo = subgrupo;
	}
	public int getOperacaoId() {
		return operacaoId;
	}
	public void setOperacaoId(int operacaoId) {
		this.operacaoId = operacaoId;
	}
	public int getMaquinaId() {
		return maquinaId;
	}
	public void setMaquinaId(int maquinaId) {
		this.maquinaId = maquinaId;
	}
	public int getCodeRefEsp() {
		return codeRefEsp;
	}
	public void setCodeRefEsp(int codeRefEsp) {
		this.codeRefEsp = codeRefEsp;
	}
	public String getOperacao() {
		return operacao;
	}
	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}
	public String getMaquina() {
		return maquina;
	}
	public void setMaquina(String maquina) {
		this.maquina = maquina;
	}
	public int getIdSub() {
		return idSub;
	}
	public void setIdSub(int idSub) {
		this.idSub = idSub;
	}
	public int getTotalAmostras() {
		return totalAmostras;
	}
	public void setTotalAmostras(int totalAmostras) {
		this.totalAmostras = totalAmostras;
	}
	public int getTotalEsp() {
		return totalEsp;
	}
	public void setTotalEsp(int totalEsp) {
		this.totalEsp = totalEsp;
	}
	public Boolean getStatusFull() {
		return statusFull;
	}
	public void setStatusFull(Boolean statusFull) {
		this.statusFull = statusFull;
	}
	public int getContagemAtual() {
		return contagemAtual;
	}
	public void setContagemAtual(int contagemAtual) {
		this.contagemAtual = contagemAtual;
	}
	
}